class Adduserurltoissues < ActiveRecord::Migration
  def change
    add_column :issues, :user_url, :string
  end
end
