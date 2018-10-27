# == Schema Information
#
# Table name: posts
#
#  id               :integer          not null, primary key
#  html_content     :text
#  markdown_content :text             not null
#  user_id          :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Post < ApplicationRecord
  belongs_to :user
  #validates :html_content, presence:true,length:{minimum:2}
  validates :markdown_content, presence:true,length:{minimum:2}
end
