// Artifact routes

const express = require('express');
const router = express.Router();
const artifactController = require('../controllers/artifactController');

// GET /hunt/artifacts — initial load (title + author + image)
router.get('/', artifactController.getAllArtifacts);

// GET /hunt/artifacts/search — search & filter
router.get('/search', artifactController.searchAndFilter);

// GET /hunt/artifacts/:id — all artifact details
router.get('/:id', artifactController.renderArtifactPage);

module.exports = router;
