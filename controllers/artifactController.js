// Artifact controller

const artifactModel = require('../models/artifactModel');
const { isSketchfabModelValid } = require('../utils/sketchfab');

const getAllArtifacts = async (req, res) => {
  try {
    const artifacts = await artifactModel.getAllArtifactsWithPreview();
    if (artifacts.length === 0) {
      return res.json({ message: 'No items found', data: [] });
    }
    res.json({ data: artifacts });
  } catch (err) {
    console.error("Error fetching all artifacts: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const searchAndFilter = async (req, res) => {
  try {
    const { q = '', category = '', type = '', floor = '' } = req.query;

    const categoryIds = category ? category.split(',').map(Number) : [];
    const typeIds = type ? type.split(',').map(Number) : [];
    const floors = floor ? floor.split(',') : [];

    const artifacts = await artifactModel.searchAndFilterArtifacts({
      searchQuery: q,
      categoryIds,
      typeIds,
      floors
    });

    if (artifacts.length === 0) {
      return res.json({ message: 'No items found', data: [] });
    }

    res.json({ data: artifacts });
  } catch (err) {
    console.error("Error during search: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const renderArtifactPage = async (req, res) => {
  try {
    const { id } = req.params;
    const artifact = await artifactModel.getArtifactById(id);

    if (!artifact) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (artifact.model_url) {
      const isValid = await isSketchfabModelValid(artifact.model_url);
      if (!isValid) artifact.model_url = null;
    }

    const allArtifacts = await artifactModel.getAllArtifactsWithPreview();
    const index = allArtifacts.findIndex(a => a.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const previousIndex = (index - 1 + allArtifacts.length) % allArtifacts.length;
    const nextIndex = (index + 1) % allArtifacts.length;

    const previousArtifact = allArtifacts[previousIndex];
    const nextArtifact = allArtifacts[nextIndex];

    res.render('hunt/artifact', {
      artifact,
      previousArtifact,
      nextArtifact
    });
  } catch (err) {
    console.error("Error rendering artifact page: ", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllArtifacts,
  searchAndFilter,
  renderArtifactPage
};

