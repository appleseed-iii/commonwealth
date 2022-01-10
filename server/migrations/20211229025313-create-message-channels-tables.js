

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.renameTable('ChatMessages', 'OldChatMessages', { transaction: t });
      await queryInterface.createTable('ChatChannels', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull: false },
        community_id: { type: Sequelize.STRING, allowNull: false, references: { model: 'Chains', key: 'id' } },
        created_at: { type: Sequelize.DATE, allowNull: false },
        updated_at: { type: Sequelize.DATE, allowNull: false }
      }, { transaction: t });
      await queryInterface.createTable('ChatMessages', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        message: { type: Sequelize.TEXT, allowNull: false },
        chat_channel_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'ChatChannels', key: 'id' }},
        created_at: { type: Sequelize.DATE, allowNull: false },
        updated_at: { type: Sequelize.DATE, allowNull: false },
      }, { transaction: t });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable('ChatChannels', { transaction: t });
      await queryInterface.dropTable('ChatMessages', { transaction: t });
      await queryInterface.renameTable("OldChatMessages", "ChatMessages", { transaction: t });
    });
  }
};
