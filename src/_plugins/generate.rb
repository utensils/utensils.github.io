require "json"

class UtensilsGenerator < Jekyll::Generator

  def generate(site)
    site.data['services']['catalog'].each do |service|
      
      # build service page
      page = Jekyll::PageWithoutAFile.new(site, site.source, "services/", "#{sanitize(service['slug'])}.md")
      page.data['layout'] = 'service'
      page.data['title'] = service['name']
      page.data['service'] = service
      site.pages << page
      
      service['offers'].each do |offer|
        # build offer pages
        page = Jekyll::PageWithoutAFile.new(site, site.source, "services/#{sanitize(service['slug'])}/", "#{sanitize(offer['slug'])}.md")
        page.data['layout'] = 'offer'
        page.data['title'] = offer['name']
        page.data['service'] = service
        page.data['offer'] = offer
        
        site.includes_load_paths.each do |load_path|
          include = "services/#{sanitize(service['slug'])}/#{sanitize(offer['slug'])}.html"

          if File.exist? "#{load_path}/#{include}"
            page.data['import'] = include 
            break
          end
        end        
        site.pages << page
      end
    end
  end
  
  def sanitize(str)
    str.downcase.sub(" ", "-")
  end

end
