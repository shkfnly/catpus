class ChangeReposTableName < ActiveRecord::Migration
  def change
    rename_table(:repos, :boards)
    rename_table(:issues, :cards)
    rename_table(:issue_assignments, :card_assignments)
    rename_table(:contributers, :board_memberships)
  end
end
