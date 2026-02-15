import { knowledgeArticles } from "./mockData.js";

export async function submitBrief({ serviceType, serviceLabel, payload, pdfUrl, email }) {
  const id = `brief_${Date.now()}`;
  return { id, pdfUrl, serviceType, serviceLabel, payload, email };
}

export async function getKnowledgeList() {
  return knowledgeArticles;
}

export async function getKnowledgeArticle(slug) {
  return knowledgeArticles.find((item) => item.slug === slug) || null;
}
