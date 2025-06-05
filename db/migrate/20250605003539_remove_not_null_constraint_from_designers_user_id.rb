class RemoveNotNullConstraintFromDesignersUserId < ActiveRecord::Migration[7.0]
  def change
    change_column_null :designers, :user_id, true
  end
end
