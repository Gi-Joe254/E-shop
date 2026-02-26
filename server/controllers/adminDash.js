import "dotenv/config"
import supabase from '../database/db.js'

export const adminDash = async(req, res)=> {
    
    try {
        
        const {data, error} = await supabase 
            .from('jobs')
            .select('*')
            .order('id', {ascending: false})

        if (error) throw error
        
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'server error'})
    } 
}

export const adminMe = async(req, res)=> {
    try {
        const { data, error } = await supabase
            .from('admin')
            .select('username')
            .eq('id', req.session.adminId)
            .single() //return one object instead of array
        
        if (error) throw error
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'})
    } 
    
}

export const completeJob = async(req, res)=> {

    const jobId = req.params.id
    if(!jobId) return res.status(400).json({message:'invalid id'})
        
    try {
        const { data, error } = await supabase
            .from('jobs')
            .update({status: 'completed'})
            .eq('id', jobId)
            .eq('status', 'pending')
            .select()
        
        
        if (error) throw error
        res.status(200).json({message:`job id: ${jobId} completed`})
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
}

export const adminDelJob = async(req, res)=> {
    const jobId = req.params.id
    if(!jobId) return res.status(400).json({message: 'invalid id'})
    
    try {
        const { data, error } = await supabase
            .from('jobs')
            .delete()
            .eq('id', jobId)
        
        if (error) throw error
        res.status(200).json({message:`job id: ${jobId} deleted`})
    } catch (error) {
        res.status(500).json({message: 'server error'})
    }
    
}