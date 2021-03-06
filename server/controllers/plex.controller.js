import { Router } from 'express';
import plexService from '../services/plex';

const router = Router();

router.get('/plex-pin', plexService.getPlexPin);
router.get('/check-plex-pin', plexService.checkPlexPin);

router.get('/users', plexService.getUsers);

router.get('/most-watched', plexService.getMostWatched);
router.get('/import/most-watched', plexService.importMostWatched);

router.get('/sections', plexService.getSections);
router.get('/import/sections', plexService.importSections);

router.get('/library/:id', plexService.getLibraryDataBySection);
router.get('/import/libraries', plexService.importLibraries);

router.get('/import/all', plexService.importAll);

export default router;
