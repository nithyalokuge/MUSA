// Artifact model

const db = require('../config/db');
const customOrder = [17, 16, 6, 3, 10, 5, 7, 2, 14, 1, 15, 13, 9, 11, 18, 4, 12, 8]; // Artifacts will appear in this order as it reflects The Hunt Museum's tour order

// On page load fetch all artifacts with 1st image, title and author
const getAllArtifactsWithPreview = async () => {
  const [rows] = await db.query(`
    SELECT a.id, a.title, a.author, ai.image_url
    FROM artifacts a
    LEFT JOIN (
      SELECT artifact_id, MIN(id) as first_image_id
      FROM artifact_images
      GROUP BY artifact_id
    ) AS first_images ON a.id = first_images.artifact_id
    LEFT JOIN artifact_images ai ON ai.id = first_images.first_image_id
    ORDER BY FIELD(a.id, ${customOrder.map(() => '?').join(',')})
  `, customOrder);
  return rows;
};

// Search by title or author and filter by category, type and floor
const searchAndFilterArtifacts = async ({ searchQuery = '', categoryIds = [], typeIds = [], floors = [] }) => {
  const hasSearch = searchQuery && searchQuery.trim();
  const params = [];
  let baseQuery = `
    SELECT DISTINCT a.id, a.title, a.author, ai.image_url
    ${hasSearch ? `,
      CASE 
        WHEN a.title LIKE ? THEN 0
        WHEN a.title LIKE ? THEN 1
        ELSE 2
      END AS relevance` : ''} 
    FROM artifacts a
    LEFT JOIN (
      SELECT artifact_id, MIN(id) as first_image_id
      FROM artifact_images
      GROUP BY artifact_id
    ) AS first_images ON a.id = first_images.artifact_id
    LEFT JOIN artifact_images ai ON ai.id = first_images.first_image_id
    LEFT JOIN artifact_categories ac ON a.id = ac.artifact_id
    WHERE 1
  `;

  if (hasSearch) {
    const queryStart = `${searchQuery}%`;
    const queryAnywhere = `%${searchQuery}%`;

    params.push(queryStart, queryAnywhere); 
    baseQuery += ` AND (a.title LIKE ? OR a.author LIKE ?)`;
    params.push(queryAnywhere, queryAnywhere); 
  }

  if (categoryIds.length) {
    baseQuery += ` AND ac.category_id IN (${categoryIds.map(() => '?').join(',')})`;
    params.push(...categoryIds);
  }

  if (typeIds.length) {
    baseQuery += ` AND a.type_id IN (${typeIds.map(() => '?').join(',')})`;
    params.push(...typeIds);
  }

  if (floors.length) {
    baseQuery += ` AND a.floor_number IN (${floors.map(() => '?').join(',')})`;
    params.push(...floors);
  }

  if (hasSearch) {
    baseQuery += ` ORDER BY relevance ASC, a.title ASC`;
  } else {
    baseQuery += ` ORDER BY FIELD(a.id, ${customOrder.map(() => '?').join(',')})`;
    params.push(...customOrder);
  }

  const [rows] = await db.query(baseQuery, params);
  return rows;
};

// Artifact details 
const getArtifactById = async (id) => {
  const [[artifact]] = await db.query(`
    SELECT a.*, t.name AS type
    FROM artifacts a
    LEFT JOIN types t ON a.type_id = t.id
    WHERE a.id = ?
  `, [id]);

  if (!artifact) return null;

  const [images] = await db.query(`
    SELECT image_url FROM artifact_images WHERE artifact_id = ?
  `, [id]);

  const [categories] = await db.query(`
    SELECT c.name FROM categories c
    JOIN artifact_categories ac ON c.id = ac.category_id
    WHERE ac.artifact_id = ?
  `, [id]);

  const [materials] = await db.query(`
    SELECT m.name FROM materials m
    JOIN artifact_materials am ON m.id = am.material_id
    WHERE am.artifact_id = ?
  `, [id]);

  return {
    ...artifact,
    images: images.map(i => i.image_url),
    categories: categories.map(c => c.name),
    materials: materials.map(m => m.name),
  };
};

module.exports = {
  getAllArtifactsWithPreview,
  searchAndFilterArtifacts,
  getArtifactById
};
