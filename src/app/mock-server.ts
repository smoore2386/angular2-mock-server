import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

const JSONDIR = './json/';

export function httpFactory(backend: MockBackend, options: BaseRequestOptions){

  // we can store saved nodes in local storage
  let nodes: any[] = JSON.parse(localStorage.getItem('nodes')) || [];

  backend.connections.subscribe((connection: MockConnection) => {
    // Setting timeout
    setTimeout(() => {


      if (connection.request.url === ('user/')
          && connection.request.method === RequestMethod.Post) {
        connection.mockRespond(new Response( new ResponseOptions({
          body: JSON.stringify({data: '1'})})));
      }

      if (connection.request.url === ('user/')
          && connection.request.method === RequestMethod.Post) {
        connection.mockRespond(new Response( new ResponseOptions({
          body: JSON.stringify({}
	  )})));
      }
      //GET cluster stats
      if (connection.request.url.endsWith('user/info')
          && connection.request.method === RequestMethod.Get) {
          let eps = Math.floor(Math.random() * 50000) + 50000;
          connection.mockRespond(new Response( new ResponseOptions({
            body: JSON.stringify({fileRetention: 20, connectionRetention: 30, processedEps: eps})})));
      }

      // get advanced Options
      if (connection.request.url.endsWith('user/options')
          && connection.request.method === RequestMethod.Get) {

        connection.mockRespond(new Response( new ResponseOptions({
          body: JSON.stringify({eventRetention: {connection: 90, file: 10}, replicationFactor: 2})})));
      }
      // get advanced Options
      if (connection.request.url.endsWith('user/pageData')
          && connection.request.method === RequestMethod.Get) {

        let json = '';
        connection.mockRespond(new Response( new ResponseOptions({
           body: JSON.stringify({}
	   })})));
      }


    }, 500);
  });

  return new Http(backend, options);
}
export let mockServerProvider = {
  // provide http for mock backend
  provide: Http,
  useFactory: httpFactory,
  deps: [MockBackend, BaseRequestOptions]
};

