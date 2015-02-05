class FixSchema < ActiveRecord::Migration
  def change
    rename_column :card_assignments, :issue_id, :card_id
    remove_column :lists, :repo_id, :integer
    add_column :lists, :board_id, :integer
  end
end
