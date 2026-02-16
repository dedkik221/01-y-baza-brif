import { knowledgeArticles } from "./mockData.js";

export async function submitBrief({ serviceType, serviceLabel, payload, pdfUrl, email }) {
  const id = `brief_${Date.now()}`;
  return { id, pdfUrl, serviceType, serviceLabel, payload, email };
}

export async function getKnowledgeList() {
  return knowledgeArticles;
}

export async function getKnowledgeArticle(slug) {
  const normalizedSlug = (slug || "").trim().toLowerCase();
  return (
    knowledgeArticles.find(
      (item) =>
        item.slug === normalizedSlug ||
        (Array.isArray(item.aliases) && item.aliases.includes(normalizedSlug))
    ) || null
  );
}
