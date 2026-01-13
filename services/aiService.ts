
import { SummaryResult } from "../types";

const SYSTEM_INSTRUCTION = `你是一位世界顶尖的生物技术与分子生物学学术研究助理。你的任务是深度解析用户提供的科研文献。
输出要求：
1. 语言：中文（学术风格，适合公众号发布）。
2. 结构：必须包含摘要、核心发现、方法论、结论。
3. **关键要求**：必须设立一个独立的“噬菌体展示肽技术 (Phage Display Peptide Technology)”专题分析部分。即使文献不直接以此为主题，也要分析该技术在研究中的潜在应用、相关性或在该领域的前景。
4. 返回格式：必须仅返回合法的 JSON 格式。

JSON 结构示例：
{
  "overallSummary": "字符串",
  "keyFindings": ["发现1", "发现2"],
  "phageDisplaySection": "深入分析内容",
  "methodology": "实验方法说明",
  "conclusions": "结论总结"
}`;

export const analyzeLiterature = async (text: string): Promise<SummaryResult & { reasoning?: string }> => {
  const apiKey = process.env.API_KEY;
  const endpoint = 'https://uni-api.cstcloud.cn/v1/chat/completions';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-r1', 
      messages: [
        { role: 'system', content: SYSTEM_INSTRUCTION },
        { role: 'user', content: `请基于以下文献内容生成 JSON 报告，确保包含噬菌体专题分析：\n\n${text}` }
      ],
      // 强制模型输出 JSON
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API 请求失败 (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const choice = data.choices[0];
  const content = choice.message.content;
  const reasoning = choice.message.reasoning_content; // DeepSeek-R1 特有的推理字段

  try {
    // 处理可能存在的 Markdown 代码块包裹
    const cleanJson = content.replace(/```json\n?/, '').replace(/\n?```/, '').trim();
    const result = JSON.parse(cleanJson);
    return { ...result, reasoning };
  } catch (error) {
    console.error("JSON 解析失败，原始内容:", content);
    throw new Error("模型生成的 JSON 格式异常，请尝试重新解析。");
  }
};
