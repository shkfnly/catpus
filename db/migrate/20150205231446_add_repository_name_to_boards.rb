class AddRepositoryNameToBoards < ActiveRecord::Migration
  def change
    add_column :boards, :repository_name, :string, null: false
  end
end
