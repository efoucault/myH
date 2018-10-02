class ChangeNames < ActiveRecord::Migration[5.2]
  def change
    rename_column :items, :type, :categorie
  end
end
