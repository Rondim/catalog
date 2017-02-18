/**
 * Created by xax on 18.02.2017.
 */
export function makeHash()
{
    let hash = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( let i=0; i < 10; i++ )
        hash += possible.charAt(Math.floor(Math.random() * possible.length));

    return hash;
}