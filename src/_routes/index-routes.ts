import FileRoutes from './file-routes';
import FolderRoutes from './folder-routes';


const routes = (app: any, api: any) => {    
    app.use(`/${api}/file`, FileRoutes);
    app.use(`/${api}/folder`, FolderRoutes);
}
export default {routes};