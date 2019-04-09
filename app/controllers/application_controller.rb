class ApplicationController < ActionController::Base
  # 未ログインの場合、ログインページに遷移する
  before_action :authenticate_user!
  # deviseのサニタイザー
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:nickname])
  end
end
