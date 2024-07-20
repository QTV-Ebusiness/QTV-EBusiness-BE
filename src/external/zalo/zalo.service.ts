import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ZaloService {
  public async createArticle() {
    const body = {
      type: 'normal',
      title: 'News',
      author: 'News',
      cover: {
        cover_type: 'photo',
        photo_url: 'https://stc-developers.zdn.vn/images/bg_1.jpg',
        status: 'show',
      },
      description: 'This is news',
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
      status: 'show',
      comment: 'show',
    };

    const apiUrl = 'https://openapi.zalo.me/v2.0/article/create';
    const accessToken = '';
    try {
      const response = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          access_token: accessToken,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  public async updateArticle() {
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
    const accessToken = '';
    try {
      const response = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          access_token: accessToken,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  public async getArticle() {
    const id = '2d845d1da6584f061649';
    const apiUrl = `https://openapi.zalo.me/v2.0/article/getdetail?id=${id}`;
    const accessToken = '';
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          access_token: accessToken,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  public async getArticles() {
    const apiUrl = `https://openapi.zalo.me/v2.0/article/getslice?offset=0&limit=1&type=normal`;
    const accessToken = '';
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          access_token: accessToken,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteArticle() {
    const body = {
      id: '',
    };

    const apiUrl = `https://openapi.zalo.me/v2.0/article/remove`;
    const accessToken = '';
    try {
      const response = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          access_token: accessToken,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  public async sendMessagePromotion() {
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
    const accessToken = '';
    try {
      const response = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          access_token: accessToken,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  public async sendBroadcast() {
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
                attachment_id: '2d845d1da6584f061649',
              },
            ],
          },
        },
      },
    };
    const apiUrl = 'https://openapi.zalo.me/v2.0/oa/message';
    const accessToken = '';
    try {
      const response = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          access_token: accessToken,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  public async sendMessage() {
    const body = {
      recipient: {
        user_id: '2473910995809050719',
      },
      message: {
        text: 'Hello World!',
        //image attachment: optional
        attachment: {
          type: 'template',
          payload: {
            template_type: 'media',
            elements: [
              {
                media_type: 'image',
                url: 'https://stc-developers.zdn.vn/images/bg_1.jpg',
              },
            ],
          },
        },
      },
    };
    const apiUrl = 'https://openapi.zalo.me/v3.0/oa/message/cs';
    const accessToken = '';
    try {
      const response = await axios.post(apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          access_token: accessToken,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
