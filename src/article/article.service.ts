import { Injectable } from '@nestjs/common';
import { Article } from 'libs/entities';
import { getQueryPaging, response } from 'libs/utils';
import { getRepository } from 'typeorm';
import { isEmpty } from 'lodash';
import { CreateArticleBodyDTO } from 'types/article';
import { FacebookService } from 'src/external/facebook/facebook.service';
import { ZaloService } from 'src/external/zalo/zalo.service';

@Injectable()
export class ArticleService {
  constructor(
    private readonly facebookService: FacebookService,
    private readonly zaloService: ZaloService,
  ) {}
  public async createArticle(body: CreateArticleBodyDTO, accountId: number) {
    const {
      content,
      description,
      isFacebook,
      isZalo,
      // isInstagram,
      isCreateNow,
      photoUrl,
      title,
    } = body;
    const article = await getRepository(Article).save({
      ...body,
      createdAt: new Date(),
      createdBy: accountId,
    });
    if (isCreateNow) {
      const [facebookPost, zaloPost] = await Promise.all([
        isFacebook &&
          this.facebookService.createPostWithImage({ content, photoUrl }),
        isZalo &&
          this.zaloService.createArticle({
            title,
            description,
            content,
            photoUrl,
          }),
      ]);
      const zaloPostId =
        zaloPost.status == 200
          ? await this.zaloService.getArticleId(zaloPost.data.token)
          : null;
      const updateArticle = {
        facebookPostId: facebookPost?.data?.post_id || null,
        zaloPostId: zaloPostId?.data?.id,
      };
      getRepository(Article)
        .update({ id: article.id }, updateArticle)
        .catch((error) => console.log(error));
    }
    return response(200, 'SUCCESSFULLY', article);
  }

  public async updateArticle(articleId: number, body, accountId: number) {
    const article = await getRepository(Article).findOne({
      id: articleId,
      isDeleted: false,
    });
    if (!article) return response(404, 'NOT_FOUND');
    await getRepository(Article).update(
      { id: articleId },
      {
        ...body,
        updatedAt: new Date(),
        updatedBy: accountId,
      },
    );
    return response(200, 'SUCCESSFULLY', article);
  }

  public async getArticle(articleId: number) {
    const article = await getRepository(Article).findOne({
      id: articleId,
      isDeleted: false,
    });
    if (!article) return response(404, 'NOT_FOUND');
    return response(200, 'SUCCESSFULL', article);
  }

  public async getArticles(payload) {
    const [skip, take] = getQueryPaging(payload);
    const [articles, total] = await getRepository(Article).findAndCount({
      where: { isDeleted: false },
      order: { id: 'DESC' },
      take,
      skip,
    });
    if (isEmpty(articles)) return response(404, 'NOT_FOUND');
    return response(200, 'SUCCESSFULL', { result: articles, total });
  }

  public async deleteArticle(articleId: number, accountId: number) {
    const article = await getRepository(Article).findOne({
      id: articleId,
      isDeleted: false,
    });
    if (!article) return response(404, 'NOT_FOUND');
    if (
      article.facebookPostId ||
      article.zaloPostId ||
      article.instagramPostId
    ) {
      return response(400, 'CANNOT_DELETE');
    }
    await getRepository(Article).update(
      { id: articleId },
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: accountId,
      },
    );
    return response(200, 'SUCCESSFULLY');
  }
}
