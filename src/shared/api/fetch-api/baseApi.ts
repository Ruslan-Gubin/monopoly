import { config } from "@/shared/lib";
import { CookieService } from "@/shared/service";


interface BaseFetchProps {
  params: string | null;
  url: string;
  method: string;
  body?: {}
}

export const baseFetch = <T>({ body, params, url, method='GET' }:BaseFetchProps ): Promise<T> => {
  
  const urlEndpoint = config.API_ENDPOINT
  const token = CookieService.get('token')
  
  return new Promise((resolve, reject) => {
      try{

        const _config: RequestInit = { 
          method, 
          headers: {
          'Content-Type': 'application/json', 
          Authentication: token ? token : '',
          },
        }
         
        if (body) {
          _config['body'] = JSON.stringify(body)
        }
        
        let mainUrl = new URL(`${urlEndpoint}/${url}`)
        
        if (params) {
          mainUrl = new URL(`${mainUrl}/${params}`)
        }
          
          window.fetch(mainUrl, {
            ..._config,
          })
          .then(response => response.json())
          .then(resolve, reject)
          
      } catch(error) {
        console.log('Error in base fetch:', error)
        reject(error)
      }
  })
}

