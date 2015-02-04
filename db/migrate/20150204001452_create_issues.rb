class CreateIssues < ActiveRecord::Migration
  def change
    create_table :issues do |t|
      t.string :title, null: false
      t.integer :list_id, null: false
      t.text  :description
      t.float :ord , null: false, default: 0.0

      t.timestamps null: false
    end
  end
end
