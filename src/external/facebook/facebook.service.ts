import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FacebookService {
  public async createPostWithImage() {
    const accessToken = '';
    const body = {
      message:
        'Hello, world! 🌍 Check out this image! 📸\nWebsite của toy: https://qtv.multichannel.cuocthien.io.vn/login',
      access_token: accessToken,
      url: 'https://cdn.tgdd.vn/Products/Images/44/306141/msi-modern-15-b13m-i5-438vn-1.jpg',
      privacy: '{"value":"EVERYONE"}',
    };
    const pageId = '376516972209004';
    const apiUrl = `https://graph.facebook.com/v20.0/${pageId}/photos`;
    try {
      const result = await axios.post(apiUrl, new URLSearchParams(body));
      return result;
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
    const accessToken = '';
    const body = {
      message: 'toy update bài này nè',
      access_token: accessToken,
    };
    const apiUrl = `https://graph.facebook.com/v20.0/${postId}`;
    try {
      const result = await axios.post(apiUrl, new URLSearchParams(body));
      return result;
      /* res { success: true} */
    } catch (error) {
      console.log(error);
    }
  }

  public async deletePost() {
    const postId = '376516972209004_122101764314422157';
    const accessToken = '';
    const apiUrl = `https://graph.facebook.com/v20.0/${postId}`;
    try {
      const result = await axios.delete(apiUrl, {
        data: new URLSearchParams({ accessToken }),
      });
      return result;
      /* res { success: true} */
    } catch (error) {}
  }

  public async getAllPost() {
    const pageId = '376516972209004';
    const fields =
      'id,message,comments{attachment{media,type},comments{message,from, attachment{media,type}, like_count},like_count,user_likes,message,created_time,id,from,likes{picture,username,pic,id,name,user_likes},reactions.summary(true)},reactions{id,name,type,reactions.summary(true)},attachments{media,type},permalink_url';
    const accessToken = '';
    const apiUrl = `https://graph.facebook.com/v20.0/${pageId}/posts`;
    const response = await axios.get(
      `${apiUrl}?fields=${fields}&access_token=${accessToken}`,
    );
    return response;
  }

  public async getPost() {
    const postId = '376516972209004_122099158280422157';
    const fields =
      'id,message,comments{attachment{media,type},comments{message,from, attachment{media,type}, like_count},like_count,user_likes,message,created_time,id,from,likes{picture,username,pic,id,name,user_likes},reactions.summary(true)},reactions{id,name,type,reactions.summary(true)},attachments{media,type},permalink_url';
    const accessToken = '';
    const apiUrl = `https://graph.facebook.com/v20.0/${postId}?`;
    const response = await axios.get(`${apiUrl}${fields}&${accessToken}`);
    return response;
  }

  public async getComment() {
    const postId = '376516972209004_122099158280422157';
    const accessToken = '';
    const params = {
      access_token: accessToken,
    };
    const apiUrl = `https://graph.facebook.com/v20.0/${postId}/comments`;
    const result = await axios.get(apiUrl, { params });
    return result;
  }

  public async getReactions() {
    const postId = '376516972209004_122099158280422157';
    const accessToken = '';
    const params = {
      access_token: accessToken,
      summary: 'true',
      type: 'HAHA', // [LIKE, HAHA, LOVE, CARE, ANGRY]
    };
    const apiUrl = `https://graph.facebook.com/v20.0/${postId}/reactions`;
    const response = await axios.get(apiUrl, { params });
    return response;
  }
}
