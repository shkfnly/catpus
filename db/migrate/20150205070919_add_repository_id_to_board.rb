class AddRepositoryIdToBoard < ActiveRecord::Migration
  def change
    add_column :boards, :repository_id, :integer
  end
end
