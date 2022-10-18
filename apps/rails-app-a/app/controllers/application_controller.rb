class ApplicationController < ActionController::Base
  def hello
    render html: ::Gem::A::Printer.print
  end
end
