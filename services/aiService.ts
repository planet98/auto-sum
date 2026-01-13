
import { SummaryResult } from "../types";

export const analyzeLiterature = async (text: string): Promise<SummaryResult & { reasoning?: string }> => {
  // 必须使用相对路径！这样请求才会由 Cloudflare Pages 后端脚本处理，从而避开跨域限制。
  // 请确保你的项目根目录下有一个 functions/api/analyze.ts 文件。
  const proxyPath = '/api/analyze';
  
  try {
    const response = await fetch(proxyPath, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      // 如果返回 404，说明 functions 脚本没部署成功
      if (response.status === 404) {
        throw new Error("找不到后端分析服务 (404)。请确保 functions/ 文件夹已正确部署在项目根目录。");
      }
      
      const errorData = await response.json().catch(() => ({ error: '未知服务器错误' }));
      throw new Error(errorData.error || `服务器请求失败: ${response.status}`);
    }

    const data = await response.json();
    
    // 解析 Uni-API 返回的 DeepSeek 数据结构
    if (!data.choices || data.choices.length === 0) {
      throw new Error("模型没有返回任何结果，请检查 API Key 余额或接口状态。");
    }

    const choice = data.choices[0];
    const content = choice.message.content;
    const reasoning = choice.message.reasoning_content;

    // 处理可能的 JSON 包裹
    const cleanJson = content.replace(/```json\n?/, '').replace(/\n?```/, '').trim();
    const result = JSON.parse(cleanJson);
    return { ...result, reasoning };

  } catch (error: any) {
    console.error("Analysis Error:", error);
    if (error.message === 'Failed to fetch') {
      throw new Error("网络请求失败。请检查：1. 脚本是否已部署到 Cloudflare；2. 是否正在本地开发环境下运行（需使用 wrangler pages dev）。");
    }
    throw error;
  }
};
