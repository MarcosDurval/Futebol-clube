import ModelClubs from '../../../database/sequelize.models/clubs';

const associate = [{ model: ModelClubs, as: 'homeClub', attributes: ['clubName'] },
  { model: ModelClubs, as: 'awayClub', attributes: ['clubName'] }];

export default associate;
