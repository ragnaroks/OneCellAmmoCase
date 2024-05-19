import {DependencyContainer} from 'tsyringe';
import {IPostDBLoadMod} from '@spt-aki/models/external/IPostDBLoadMod';
import {ILogger} from "@spt-aki/models/spt/utils/ILogger";
import {DatabaseServer} from '@spt-aki/servers/DatabaseServer';
import {IDatabaseTables} from '@spt-aki/models/spt/server/IDatabaseTables';

class Mod implements IPostDBLoadMod {
    public postDBLoad(container:DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const databaseServer = container.resolve<DatabaseServer>('DatabaseServer');
        
        const tables:IDatabaseTables = databaseServer.getTables();
        
        const item_container_ammo = tables.templates.items['5aafbde786f774389d0cbc0f'];
        item_container_ammo._props.Weight = 0;
        item_container_ammo._props.Width = 1;
        item_container_ammo._props.Height = 1;

        logger.warning('[OneCellAmmoCase]: AmmoCase will place in 1 cell');
    }
}

module.exports = {
    mod: new Mod()
};
