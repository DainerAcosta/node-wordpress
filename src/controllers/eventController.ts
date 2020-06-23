import { Request, Response } from 'express';
import pool from '../database/db';

interface Postmeta {
    ID: number,
    post_author: number,
    post_content: string,
    post_title: string,
    startdate?: string,
    enddate?: string,
    starttime?: string,
    location?: string
}

class EventController {

    public async getEvent(req: Request, res: Response): Promise<any> {
        try {
            const post_type = 'el_events';
            const post_status = 'publish';
            let dataInfo: Postmeta[] = [];
            let eventsdatos = await pool.query('SELECT ID, post_author, post_content, post_title FROM wp_posts WHERE post_type = ? AND post_status = ?', [post_type, post_status]);
            let post = JSON.parse(JSON.stringify(eventsdatos));
            for (let i = 0; i < post.length; i++) {
                let id = post[i].ID;
                let eventsInfo = await pool.query('SELECT * FROM wp_postmeta WHERE post_id = ?', [id]);

                let data: Postmeta = {
                    ID: post[i].ID,
                    post_author: post[i].post_author,
                    post_content: post[i].post_content,
                    post_title: post[i].post_title,
                    startdate: '',
                    enddate: '',
                    starttime: '',
                    location: '',
                }

                let postmeta = JSON.parse(JSON.stringify(eventsInfo));
                for (let j = 0; j < postmeta.length; j++) {
                    let x = postmeta[j].meta_key;
                    if (x === 'startdate') {
                        data.startdate = postmeta[j].meta_key === 'startdate' ? postmeta[j].meta_value: null;
                    }
                    if (x === 'enddate') {
                        data.enddate = postmeta[j].meta_key === 'enddate' ? postmeta[j].meta_value: null;
                    }
                    if (x === 'starttime') {
                        data.starttime = postmeta[j].meta_key === 'starttime' ? postmeta[j].meta_value: null;
                    }
                    if (x === 'location') {
                        data.location = postmeta[j].meta_key === 'location' ? postmeta[j].meta_value: null;
                    }
                }
                dataInfo = [...dataInfo, data];
            }
            res.json(dataInfo);
        } catch (error) {
            console.log(error);
        }
    }

}

export const eventController = new EventController;