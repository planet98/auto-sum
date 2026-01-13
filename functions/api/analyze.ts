
interface Env {
  API_KEY: string;
}

export const onRequest = async (context: { request: Request; env: Env }): Promise<Response> => {
  // 跨域预检处理
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (context.request.method !== "POST") {
    return new Response(JSON.stringify({ error: "仅支持 POST 请求" }), { 
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const { text } = await context.request.json() as { text: string };
    const apiKey = context.env.API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "未在 Cloudflare 中配置 API_KEY 环境变量。" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const endpoint = 'https://uni-api.cstcloud.cn/v1/chat/completions';

    const SYSTEM_INSTRUCTION = `你是一位世界顶尖的生物技术专家。解析文献并返回 JSON。
必须包含以下字段：overallSummary, keyFindings(数组), phageDisplaySection, methodology, conclusions。
请确保 phageDisplaySection 详细分析文献中涉及的噬菌体展示技术。`;

    const apiResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-r1',
        messages: [
          { role: 'system', content: SYSTEM_INSTRUCTION },
          { role: 'user', content: text }
        ]
      })
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return new Response(JSON.stringify({ 
        error: `上游接口错误: ${apiResponse.status}`,
        details: data 
      }), { 
        status: apiResponse.status,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      },
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: `代理脚本执行错误: ${error.message}` }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
};
