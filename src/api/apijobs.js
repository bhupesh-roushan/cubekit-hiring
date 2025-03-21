import SavedJobs from "@/pages/SavedJobs";
import supabaseClient from "@/utils/supabase";



// Fetch Jobs

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),saved:saved_jobs(id)");
  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }
  const { data, error } = await query;

  if (error) {
    console.log("Error Fetching Jobs:", error);
    return null;
  }
  return data;
}


// Read Saved Jobs

export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.log("Error Deleting Saved Job:", deleteError);
      return null;
    }
    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();
    if (insertError) {
      console.log("Error In inserting Saved Job:", insertError);
      return null;
    }
    return data;
  }
}


// single job

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select(
      "*, company: companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Job:", error);
    return null;
  }

  return data;
}

// for update hiring Status


export async function updateHiringStatus(token, { job_id },isOpen) {
    const supabase = await supabaseClient(token);
    let query = supabase
      .from("jobs")
      .update({isOpen})
      .eq("id", job_id)
      .select()
  
    const { data, error } = await query;
  
    if (error) {
      console.error("Error Updating Job:", error);
      return null;
    }
  
    return data;
  }

///Posting the Job


  export async function addNewJob(token, _, jobData) {
    const supabase = await supabaseClient(token);
  
    const { data, error } = await supabase
      .from("jobs")
      .insert([jobData])
      .select();
  
    if (error) {
      console.error("Error Creating Job",error);
      return null
    }
  
    return data;
  }




  export async function getSavedJobs(token) {
    const supabase = await supabaseClient(token);
  
    const { data, error } = await supabase
      .from("saved_jobs")
      .select("*,job:jobs(*,company:companies(name,logo_url))");
  
    if (error) {
      console.error("Error Getting Saved  Job",error);
      return null
    }
  console.log(data)
    return data;
  }





  export async function getMyJobs(token,{recruiter_id}) {
    const supabase = await supabaseClient(token);
  
    const { data, error } = await supabase
      .from("jobs")
      .select("*,company:companies(name,logo_url)")
      .eq("recruiter_id",recruiter_id)

  
    if (error) {
      console.error("Error Getting Jobs",error);
      return null
    }
  console.log(data)
    return data;
  }



  export async function deleteJob(token,{job_id}) {
    const supabase = await supabaseClient(token);
  
    const { data, error } = await supabase
      .from("jobs")
      .delete()
      .eq("id",job_id)
      .select()

  
    if (error) {
      console.error("Error Deleting Job",error);
      return null
    }
  console.log(data)
    return data;
  }






