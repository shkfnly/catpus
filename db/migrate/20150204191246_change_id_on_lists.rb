class ChangeIdOnLists < ActiveRecord::Migration
  def change
    remove_column :lists, :board_id, :integer
    add_column  :lists, :repo_id, :integer
  end
end
