import { getQuery } from '@/common/utils';
export const translation = {
  en: {
    placeholder: 'you can describe your issues or share your ideas with us at here',
    submit: 'Submit',
  },
  es: {
    placeholder: 'puede describir sus problemas o compartir sus ideas con nosotros aquí',
    submit: 'enviar',
  },
  vi: {
    placeholder: 'bạn có thể mô tả các vấn đề của bạn hoặc chia sẻ ý tưởng của bạn với chúng tôi tại đây',
    submit: 'Gửi đi',
  },
  th: {
    placeholder: 'คุณสามารถอธิบายปัญหาของคุณหรือแบ่งปันความคิดของคุณกับเรา',
    submit: 'เสนอ',
  },
  ru: {
    placeholder: 'Вы можете описать свои проблемы или поделиться своими идеями с нами здесь',
    submit: 'Отправить',
  },
  pt: {
    placeholder: 'você pode descrever seus problemas ou compartilhar suas idéias conosco aqui',
    submit: 'enviar',
  },
  in: {
    placeholder: 'Anda dapat menggambarkan masalah Anda atau berbagi ide dengan kami di sini',
    submit: 'Kirimkan',
  },
};

const language = getQuery('lang').toLocaleLowerCase().slice(0, 2);
const ourlang = ['en', 'es', 'in', 'pt', 'ru', 'th', 'vi'];
export const lang = ourlang.includes(language) ?  language : 'en';
export function translateText(key) {
  return translation[lang][key];
}
