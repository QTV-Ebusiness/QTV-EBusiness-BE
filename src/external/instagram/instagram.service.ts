import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class InstagramService {
  public async createPost() {
    const access_token = '';
    const instagram_id = '17841467703626678';
    const container_api_url = `https://graph.facebook.com/v20.0/${instagram_id}/media`;
    const image_url =
      'https://cdn.tgdd.vn//Products//Images//44//306141//msi-modern-15-b13m-i5-438vn-1.jpg';
    const caption =
      'Tùm lum hơn nữa nè\nHello, world! 🌍 Check out this image! 📸\nWebsite của toy: https://qtv.multichannel.cuocthien.io.vn/login';
    try {
      const container = await axios.post(
        `${container_api_url}?access_token=${access_token}&image_url=${image_url}&caption=${caption}`,
      );
      // container : {"id": "18104492827415660"}
      const params = {
        access_token: '',
        creation_id: container['id'],
      };
      const publish_api_url = `https://graph.facebook.com/v20.0/${instagram_id}/media_publish`;
      const response = await axios.post(publish_api_url, '', { params });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async getPost() {
    const instagram_id = '17841467703626678';
    const api_url = `https://graph.facebook.com/v20.0/${instagram_id}/media`;
    const access_token =
      'EAAVnIHhNl5gBOzuJvl1AYynCIxydFCnxT5Gcpj9HDAufM8MfmmfNrxGZCNFYMBPToFM0hupelZC0vJOY47wH3EsRSrADu47dWKCL0NeImb3olAF2RUnaPseuPoZAxJcLTCt5WZAtT8OGjZAe9KJUEqmsflOQczG9oOlDRufTdMNbwHU0beO1oZCgpYHFMe7QUa';
    const fields =
      'id,username,media_type, media_url,thumbnail_url,caption,comments{username,text,like_count},comments_count,like_count';
    const response = await axios.get(
      `${api_url}?access_token=${access_token}&fields=${fields}`,
    );
    return response;
  }
}
