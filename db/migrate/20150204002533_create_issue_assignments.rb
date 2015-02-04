class CreateIssueAssignments < ActiveRecord::Migration
  def change
    create_table :issue_assignments do |t|
      t.integer :user_id, null: false
      t.integer :issue_id, null: false
      t.timestamps null: false
    end
  end
end
