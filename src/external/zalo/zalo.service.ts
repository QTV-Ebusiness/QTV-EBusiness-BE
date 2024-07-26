import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ZaloToken } from 'libs/entities';
import { response } from 'libs/utils';
import { LessThan, MoreThan, getRepository } from 'typeorm';
import { SendBroadcastBodyDTO, SendMessageBodyDTO } from 'types';
import * as moment from 'moment';
@Injectable()
export class ZaloService {
  public async createArticle(payload) {
    const zaloToken = await this.getAccessToken();
    const body = {
      type: 'normal',
      title: payload.title,
      author: 'News',
      cover: {
        cover_type: 'photo',
        photo_url: payload.photoUrl,
        status: 'show',
      },
      description: payload.description,
      body: [
        {
          type: 'text',
          content: payload.content,
        },
      ],
      status: 'show',
      comment: 'show',
    };

    const apiUrl = 'https://openapi.zalo.me/v2.0/article/create';
    try {
      const result = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          access_token: zaloToken.data.accessToken,
        },
      });
      return response(result.status, 'SUCCESSFULL', result.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  public async getArticleId(token: string) {
    const zaloToken = await this.getAccessToken();
    const apiUrl = 'https://openapi.zalo.me/v2.0/article/verify';
    try {
      const result = await axios.post(
        apiUrl,
        { token: token },
        {
          headers: {
            'Content-Type': 'application/json',
            access_token: zaloToken.data.accessToken,
          },
        },
      );
      return response(200, 'SUCCESSFULL', result.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  public async updateArticle() {
    const zaloToken = await this.getAccessToken();
    const body = {
      id: 'a45424s214ddertd214g',
      type: 'normal',
      title: 'News',
      author: 'News',
      cover: {
        cover_type: 'photo',
        photo_url: 'https://stc-developers.zdn.vn/images/bg_1.jpg',
        status: 'show',
      },
      description: 'This is news',
      status: 'show',
      body: [
        {
          type: 'text',
          content: 'This is news',
        },
        {
          type: 'text',
          content: 'This is news',
        },
      ],
      comment: 'show',
    };
    const apiUrl = 'https://openapi.zalo.me/v2.0/article/update';
    try {
      const result = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          access_token: zaloToken.data.accessToken,
        },
      });
      return response(200, 'SUCCESSFULL', result.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  public async getArticle(zaloPostId: string) {
    const zaloToken = await this.getAccessToken();
    const apiUrl = `https://openapi.zalo.me/v2.0/article/getdetail?id=${zaloPostId}`;
    try {
      const result = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          access_token: zaloToken.data.accessToken,
        },
      });
      return response(200, 'SUCCESSFULLY', result.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  public async getArticles() {
    const zaloToken = await this.getAccessToken();
    const apiUrl = `https://openapi.zalo.me/v2.0/article/getslice?offset=0&limit=1&type=normal`;
    try {
      const result = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          access_token: zaloToken.data.Token,
        },
      });
      return response(200, 'SUCCESSFULL', result.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteArticle() {
    const body = {
      id: '',
    };
    const zaloToken = await this.getAccessToken();
    const apiUrl = `https://openapi.zalo.me/v2.0/article/remove`;
    try {
      const result = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          access_token: zaloToken.data.accessToken,
        },
      });
      return response(200, 'SUCCESSFULL', result.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  public async sendMessagePromotion() {
    const zaloToken = await this.getAccessToken();
    const body = {
      recipient: {
        user_id: '2473910995809050719',
      },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'promotion',
            elements: [
              {
                attachment_id:
                  'aERC3A0iYGgQxim8fYIK6fxzsXkaFfq7ZFRB3RCyZH6RyziRis3RNydebK3iSPCJX_cJ3k1nW1EQufjN_pUL1f6Ypq3rTef5nxp6H_HnXKFDiyD5y762HS-baqRpQe5FdA376lTfq1sRyPr8ypd74ecbaLyA-tGmuJ-97W',
                type: 'banner',
              },
              {
                type: 'header',
                content: '💥💥Ưu đãi thành viên Platinum💥💥',
              },
              {
                type: 'text',
                align: 'left',
                content:
                  'Ưu đãi dành riêng cho khách hàng Nguyen Van A hạng thẻ Platinum<br>Voucher trị giá 150$',
              },
              {
                type: 'table',
                content: [
                  {
                    value: 'VC09279222',
                    key: 'Voucher',
                  },
                  {
                    value: '30/12/2024',
                    key: 'Hạn sử dụng',
                  },
                ],
              },
              {
                type: 'text',
                align: 'center',
                content: 'Áp dụng tất cả cửa hàng trên toàn quốc',
              },
            ],
            buttons: [
              {
                title: 'Tham khảo chương trình',
                image_icon: '',
                type: 'oa.open.url',
                payload: {
                  url: 'https://oa.zalo.me/home',
                },
              },
              {
                title: 'Liên hệ chăm sóc viên',
                image_icon:
                  'aeqg9SYn3nIUYYeWohGI1fYRF3V9f0GHceig8Ckq4WQVcpmWb-9SL8JLPt-6gX0QbTCfSuQv40UEst1imAm53CwFPsQ1jq9MsOnlQe6rIrZOYcrlWBTAKy_UQsV9vnfGozCuOvFfIbN5rcXddFKM4sSYVM0D50I9eWy3',
                type: 'oa.query.hide',
                payload: '#tuvan',
              },
            ],
          },
        },
      },
    };
    const apiUrl = 'https://openapi.zalo.me/v3.0/oa/message/promotion';
    try {
      const result = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          access_token: zaloToken.data.accessToken,
        },
      });
      return response(200, 'SUCCESSFULL', result.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  public async sendBroadcast(payload: SendBroadcastBodyDTO) {
    const { attachmentId } = payload;
    const body = {
      recipient: {
        target: {
          gender: '0',
        },
      },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'media',
            elements: [
              {
                media_type: 'article',
                attachment_id: attachmentId,
              },
            ],
          },
        },
      },
    };
    const apiUrl = 'https://openapi.zalo.me/v2.0/oa/message';
    const zaloToken = await this.getAccessToken();
    try {
      const result = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          access_token: zaloToken.data.accessToken,
        },
      });
      return response(200, 'SUCCESSFULL', result.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  public async sendMessage(payload: SendMessageBodyDTO) {
    const { userId, text, photoUrl } = payload;
    const body = {
      recipient: {
        user_id: userId,
      },
      message: {
        text,
      },
    };
    if (photoUrl) {
      Object.assign(body.message, {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'media',
            elements: [
              {
                media_type: 'image',
                url: photoUrl,
              },
            ],
          },
        },
      });
    }
    const apiUrl = 'https://openapi.zalo.me/v3.0/oa/message/cs';
    const zaloToken = await this.getAccessToken();
    try {
      const result = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          access_token: zaloToken.data.accessToken,
        },
      });
      return response(200, 'SUCCESSFULL', result.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  public async getAccessToken() {
    const zaloToken = await getRepository(ZaloToken).findOne({
      id: 1,
      isDeleted: false,
      expireAt: MoreThan(moment().subtract(3, 'hours').toDate()),
    });
    if (zaloToken) {
      return response(200, 'SUCCESSFULLY', zaloToken);
    }
    const refreshToken = zaloToken.refreshToken;
    const result = await axios.post(
      'https://oauth.zaloapp.com/v4/oa/access_token',
      new URLSearchParams({
        refresh_token: refreshToken,
        app_id: '1796803833243893139',
        grant_type: 'refresh_token',
      }),
      {
        headers: {
          secret_key: process.env.ZALO_SECRET_KEY,
        },
      },
    );
    await getRepository(ZaloToken).update(
      { id: 1 },
      {
        accessToken: result.data.access_token,
        refreshToken: result.data.refresh_token,
        expireAt: moment().add(1, 'days').toDate(),
      },
    );
    return response(200, 'SUCCESSFULLY', result.data);
  }
}
