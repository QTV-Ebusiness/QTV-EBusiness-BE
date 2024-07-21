import { Injectable } from '@nestjs/common';
import { Article } from 'libs/entities';
import { response } from 'libs/utils';
import { getRepository } from 'typeorm';
import { isEmpty } from 'lodash';

@Injectable()
export class ArticleService {
  public async createArticle(body, accountId: number) {
    const article = await getRepository(Article).save({
      ...body,
      createdAt: new Date(),
      createdBy: accountId,
    });
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

  public async getArticles() {
    const articles = await getRepository(Article).find({
      isDeleted: false,
    });
    if (isEmpty(articles)) return response(404, 'NOT_FOUND');
    return response(200, 'SUCCESSFULL', articles);
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
