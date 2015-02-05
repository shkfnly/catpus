class AddBoardToRepositories < ActiveRecord::Migration
  def change
    add_column :repositories, :board_id, :integer
  end
end
