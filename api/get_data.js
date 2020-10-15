import { DISHES } from './../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions'
import { LEADERS } from '../shared/leaders';

export default{
    getdishes: (cb)=> setTimeout(()=> cb(DISHES),1000),
    getcomments: (cb)=> setTimeout(()=> cb(COMMENTS),1000),
    getpromotions: (cb)=> setTimeout(()=> cb(PROMOTIONS),1000),
    getleaders: (cb)=> setTimeout(()=> cb(LEADERS),1000)
}
