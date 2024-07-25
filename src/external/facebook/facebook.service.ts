import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { response } from 'libs/utils';

@Injectable()
export class FacebookService {
  public async createPostWithImage(payload) {
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const body = {
      message: payload.content,
      access_token: accessToken,
      url: payload.photoUrl,
      privacy: '{"value":"EVERYONE"}',
    };
    const pageId = '376516972209004';
    const apiUrl = `https://graph.facebook.com/v20.0/${pageId}/photos`;
    try {
      const result = await axios.post(apiUrl, new URLSearchParams(body));
      return response(200, 'SUCCESSFULLY', result.data);
      /* res {
        "id": "122101771010422157",
        "post_id": "376516972209004_122101771070422157"
        }
       */
    } catch (error) {
      console.log(error);
    }
  }

  public async updatePost() {
    const postId = '376516972209004_122101764314422157';
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const body = {
      message: 'toy update bài này nè',
      access_token: accessToken,
    };
    const apiUrl = `https://graph.facebook.com/v20.0/${postId}`;
    try {
      const result = await axios.post(apiUrl, new URLSearchParams(body));
      return response(200, 'SUCCESSFULLY', result.data);
      /* res { success: true} */
    } catch (error) {
      console.log(error);
    }
  }

  public async deletePost() {
    const postId = '376516972209004_122101764314422157';
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const apiUrl = `https://graph.facebook.com/v20.0/${postId}`;
    try {
      const result = await axios.delete(apiUrl, {
        data: new URLSearchParams({ accessToken }),
      });
      return response(200, 'SUCCESSFULLY', result.data);
      /* res { success: true} */
    } catch (error) {}
  }

  public async getAllPost() {
    const pageId = '376516972209004';
    const fields =
      'id,message,comments{attachment{media,type},comments{message,from, attachment{media,type}, like_count},like_count,user_likes,message,created_time,id,from,likes{picture,username,pic,id,name,user_likes},reactions.summary(true)},reactions{id,name,type,reactions.summary(true)},attachments{media,type},permalink_url';
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const apiUrl = `https://graph.facebook.com/v20.0/${pageId}/posts`;
    const result = await axios.get(
      `${apiUrl}?fields=${fields}&access_token=${accessToken}`,
    );
    return response(200, 'SUCCESSDULLY', result.data.data);
  }

  public async getPost(postId: string) {
    try {
      const fields =
        'id,message,comments{attachment{media,type},comments{message,from, attachment{media,type}, like_count},like_count,user_likes,message,created_time,id,from,likes{picture,username,pic,id,name,user_likes},reactions.summary(true)},reactions{id,name,type,reactions.summary(true)},attachments{media,type},permalink_url';
      const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
      const apiUrl = `https://graph.facebook.com/v20.0/${postId}?`;
      const result = await axios.get(
        `${apiUrl}field=${fields}&access_token=${accessToken}`,
      );
      return response(200, 'SUCCESSDULLY', result.data);
    } catch (error) {
      console.log(error);
    }
  }

  public async getComments(postId: string) {
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const params = {
      access_token: accessToken,
    };
    const apiUrl = `https://graph.facebook.com/v20.0/${postId}/comments`;
    const result = await axios.get(apiUrl, { params });
    return response(200, 'SUCCESSFULLY', result.data);
  }

  public async getReactions(payload) {
    const { postId, type } = payload;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const params = {
      access_token: accessToken,
      summary: 'true',
      type, // [LIKE, HAHA, LOVE, CARE, ANGRY]
    };
    const apiUrl = `https://graph.facebook.com/v20.0/${postId}/reactions`;
    const result = await axios.get(apiUrl, { params });
    return response(200, 'SUCCESSFULLY', result.data);
  }
}
