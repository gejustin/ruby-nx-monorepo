class ApplicationController < ActionController::Base
  def hello
    render html: ::Gem::B::Printer.print
  end
end
