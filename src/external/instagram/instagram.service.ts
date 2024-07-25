import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { response } from 'libs/utils';

@Injectable()
export class InstagramService {
  public async createPost(payload) {
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const container_api_url = `https://graph.facebook.com/v20.0/17841467703626678/media`;
    const image_url = payload.photoUrl;
    const caption = payload.content;
    try {
      const container = await axios.post(container_api_url, {
        image_url: image_url,
        caption: caption,
        access_token: accessToken,
      });
      // container : {"id": "18104492827415660"}
      const params = {
        access_token: accessToken,
        creation_id: container.data.id,
      };
      const publish_api_url = `https://graph.facebook.com/v20.0/17841467703626678/media_publish`;
      const result = await axios.post(publish_api_url, '', { params });
      return response(200, 'SUCCESSFULLY', result.data);
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  public async getAllPost() {
    const instagram_id = '17841467703626678';
    const api_url = `https://graph.facebook.com/v20.0/${instagram_id}/media`;
    const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
    const fields =
      'id,username,media_type, media_url,thumbnail_url,caption,comments{username,text,like_count},comments_count,like_count';
    const result = await axios.get(
      `${api_url}?access_token=${access_token}&fields=${fields}`,
    );
    return response(200, 'SUCCESSFULLY', result.data.data);
  }

  public async getPost(mediaId: string) {
    try {
      const fields =
        'id,username,media_type, media_url,thumbnail_url,caption,comments{username,text,like_count},comments_count,like_count';

      const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
      const result = await axios.get(
        `https://graph.facebook.com/v20.0/${mediaId}?fields=${fields}&access_token=${access_token}`,
      );
      return response(200, 'SUCCESSFULLY', result.data);
    } catch (error) {
      console.error(
        'Error fetching post details:',
        error.response ? error.response.data : error.message,
      );
    }
  }
}
