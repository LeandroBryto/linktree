import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { defineOneEntry } from 'oneentry';
import OrdersApi from 'oneentry/dist/orders/ordersApi';
import { Link } from '../types/link.type';

const ONEENTRY_URL = 'https://linktree-plus.oneentry.cloud';
const ONEENTRY_TOKEN ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYW5ndWxhci1mcm9udGVuZCIsInNlcmlhbE51bWJlciI6MSwiaWF0IjoxNzQwMTc4Nzc2LCJleHAiOjE3NzE3MTQ2Nzl9.FPlKTjkq2uOGYyccCAsBiQ3WFl_fAQ8ClBGDiiH5N9w'

let { Pages} = defineOneEntry(
  ONEENTRY_URL,{
    token: ONEENTRY_TOKEN,
    langCode: 'en_US'

 }
);

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() { }

  async getLinks(): Promise<Link[]>{
    try{
    let pages = await Pages.getPages();
    return pages.map((page: any) => {
      const pageExistssOutside = page.attributeValues?.['page-exists-outside']?.value || false;

      let extractedUrl = page.pageUrl;
      if(pageExistssOutside){
      const urlFormatted = page.localizeInfos?.['htmlContent']?.replace(/^<p>|<\/p>$/g,'') || '';
      const extractedUrl = urlFormatted.match(/https?:\/\/[^\s"<>]+/)[0];
      }
      return{
        title: page.localizeInfos?.['title'] || '',
        isVisible: page.isVisible || true,
        url: extractedUrl
        }
     });
    } catch (error){
      console.log("Error ao buscar links")
     return []
    }
  }
}
