import { createDB } from '../database/db.js'

export const adminDash = async(req, res)=> {
    let db
    try {
        db = await createDB()
        
        const jobs = await db.all(`
            SELECT * FROM jobs ORDER BY id DESC
        `)
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({message:'server error'})
    } finally {
        if(db) await db.close()
    }
}

export const adminMe = async(req, res)=> {
    let db
    try {
        
        db = await createDB()
        const adminName = await db.get(`
           SELECT username FROM admin WHERE id = ?
        `, [req.session.adminId]
        )
        res.status(200).json(adminName)
    } catch (error) {
        res.status(500).json({message: 'server error'})
    } finally {
        if(db) await db.close()
    }
    
}

export const completeJob = async(req, res)=> {
    const jobId = req.params.id
    if(isNaN(jobId)) return res.status(400).json({message:'invalid id'})

    let db
    try {
        db = await createDB()
        await db.run(`
            UPDATE jobs 
            SET status = 'completed'
            WHERE id = ?
        `, [jobId]
        )
        res.status(200).json({message:`job id: ${req.params.id} completed`})
    } catch (error) {
        res.status(500).json({message:'server error'})
    } finally {
        if(db) await db.close()
    }
}

export const adminDelJob = async(req, res)=> {
    const jobId = Number(req.params.id)
    if(isNaN(jobId)) return res.status(400).json({message: 'invalid id'})
    
    let db
    try {
        db = await createDB()
        
        await db.run(`
           DELETE FROM jobs WHERE id = ?
        `, [jobId]
        )
        res.status(200).json({message:`job id: ${jobId} deleted`})
    } catch (error) {
        res.status(500).json({message: 'server error'})
    } finally {
        if(db) await db.close()
    }
    
}