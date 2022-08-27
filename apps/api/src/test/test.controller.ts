import { createSSRApp } from "vue";
import { renderToString } from 'vue/server-renderer'
import {Controller, Get} from "@nestjs/common";
import test from './test.vue';

@Controller('test')
export class TestController {
  @Get('/')
  async test() {
    const app = createSSRApp({
      data: () => ({ msg: 'hello' }),
      components: {
        test
      },
      template: `<div>{{ msg }} <test></test></div>`
    })
    return renderToString(app)
  }
}
