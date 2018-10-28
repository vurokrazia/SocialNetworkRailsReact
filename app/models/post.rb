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
  has_many :images
  attr_accessor :images_ids
  after_save :update_images
  #validates :html_content, presence:true,length:{minimum:2}
  validates :markdown_content, presence:true,length:{minimum:2}
  def self.latest
  	order("id desc")
  end
  private
	  def update_images
      puts self.images_ids
      puts images_ids
	  	Image.where(post_id: nil).where(id:self.images_ids).update_all(post_id:self.id)
	  end
end
