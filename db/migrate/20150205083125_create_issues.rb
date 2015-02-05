class CreateIssues < ActiveRecord::Migration
  def change
    create_table :issues do |t|
      t.integer :github_id, null: false
      t.string  :url      , null: false
      t.string  :html_url , null: false
      t.integer :number   , null: false
      t.string  :title    , null: false
      t.text    :body
      t.integer  :user_id , null: false
      t.string  :username, null: false
      t.integer :repository_id, null: false
      t.string  :repository_name, null: false



      t.timestamps null: false
    end
  end
end
