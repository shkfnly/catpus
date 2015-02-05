class AddUpdatedAtColumnBoard < ActiveRecord::Migration
  def change
    add_column :boards, :pushed_at, :datetime
  end
end
