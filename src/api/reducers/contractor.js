import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
  ACTIVE_CONTRACTORS,
  ALL_CONTRACTORS, ASSIGN_AREA, ASSIGN_CONTRACTOR, ASSIGN_HIGHLIGHT, ASSIGN_LANGUAGE, ASSIGNED_CONTRACTORS,
  CONTRACTOR_REDUCER, CREATE_AFFILIATION, CREATE_AWARD, CREATE_BADGE,
  CREATE_CONTRACTOR,
  CREATE_DETAILS, CREATE_PROJECT, DELETE_AFFILIATION, DELETE_AWARD, DELETE_BADGE,
  DELETE_CONTRACTOR, DELETE_PROJECT,
  DETAILS_CONTRACTOR,
  FEATURE_CONTRACTOR, POPULAR_CONTRACTORS, RECENT_CONTRACTORS, SINGLE_CONTRACTOR,
  STATUS_CONTRACTOR, UPDATE_CONTRACTOR,
  UPDATE_DETAILS,
} from "../../utils/constants";
import contractorService from "../services/contractorService";
import uploadService from "../services/uploadService";
import requestContractorService from "../services/requestContractorService";
import emailService from "../services/emailService";

const initialState = {
  loading: false,
  contractorLoading: false,
  detailsLoading: false,
  assignedLoading: false,
  deleting: false,
  noData: false,
  success: false,
  successID: 0,
  detailSuccess: false,
  affiliationSuccess: false,
  awardSuccess: false,
  badgeSuccess: false,
  projectSuccess: false,
  fetched: false,
  activeFetched: false,
  assignedFetched: false,
  contractors: [],
  activeContractors: [],
  assignedContractors: [],
  recentContractors: [],
  popularContractors: [],
  contractor: null,
  contractorDetails: null,
  error: '',
  contractorError: '',
  detailsError: '',
  assignedError: '',
}

export const addContractor = createAsyncThunk(CREATE_CONTRACTOR, (data) => {
  return uploadService.single(data.file).then(file => {
    let contractor = data.contractor;
    contractor.image = file.fileName
    return contractorService.create(contractor)
  })
})

export const addAffiliation = createAsyncThunk(CREATE_AFFILIATION, (data) => {
  return uploadService.single(data.file).then(file => {
    let affiliation = data.affiliation;
    affiliation.image = file.fileName
    return contractorService.createAffiliation(affiliation)
  })
})

export const deleteAffiliation = createAsyncThunk(DELETE_AFFILIATION, (id) => {
  return contractorService.deleteAffiliation(id).then(response => {
    if (response.success){
      return id
    } else {
      return 0
    }
  })
})

export const addAward = createAsyncThunk(CREATE_AWARD, (data) => {
  return uploadService.single(data.file).then(file => {
    let award = data.award;
    award.image = file.fileName
    return contractorService.createAward(award)
  })
})

export const deleteAward = createAsyncThunk(DELETE_AWARD, (id) => {
  return contractorService.deleteAward(id).then(response => {
    if (response.success){
      return id
    } else {
      return 0
    }
  })
})

export const addBadge = createAsyncThunk(CREATE_BADGE, (data) => {
  return uploadService.single(data.file).then(file => {
    let badge = data.badge;
    badge.image = file.fileName
    return contractorService.createBadge(badge)
  })
})

export const deleteBadge = createAsyncThunk(DELETE_BADGE, (id) => {
  return contractorService.deleteBadge(id).then(response => {
    if (response.success){
      return id
    } else {
      return 0
    }
  })
})

export const addProject = createAsyncThunk(CREATE_PROJECT, (data) => {
  return contractorService.createProject(data.project).then(async response => {
    for (let i = 0; i < data.files.length; i++) {
      console.log(i)
      await uploadService.single(data.files[i]).then(async file => {
        console.log(file)
        await contractorService.addImage({ project: response.project.id, image: file.fileName }).then(res => {
          console.log(res)
          if (i === data.files.length - 1){
            return true
          }
        })
      })
    }
  })
})

export const deleteProject = createAsyncThunk(DELETE_PROJECT, (id) => {
  return contractorService.deleteProject(id).then(response => {
    if (response.success){
      return id
    } else {
      return 0
    }
  })
})

export const updateContractor = createAsyncThunk(UPDATE_CONTRACTOR, (data) => {
  if (data.file) {
    return uploadService.single(data.file).then(file => {
      let contractor = data.contractor;
      contractor.image = file.fileName
      return contractorService.update(contractor).then(response => {
        if (response.success) {
          return contractor
        } else {
          return null
        }
      })
    })
  } else {
    return contractorService.update(data.contractor).then(response => {
      if (response.success) {
        return data.contractor
      } else {
        return null
      }
    })
  }
})

export const addContractorDetails = createAsyncThunk(CREATE_DETAILS, (data) => {
  return contractorService.createDetails(data)
})

export const editContractorDetails = createAsyncThunk(UPDATE_DETAILS, (data) => {
  return contractorService.updateDetails(data).then(response => {
    return !!response.success;
  })
})

export const getContractors = createAsyncThunk(ALL_CONTRACTORS, () => {
  return contractorService.fetchAll()
})

export const getRecentContractors = createAsyncThunk(RECENT_CONTRACTORS, () => {
  return contractorService.fetchRecent()
})

export const getPopularContractors = createAsyncThunk(POPULAR_CONTRACTORS, () => {
  return contractorService.fetchPopular()
})

export const getContractor = createAsyncThunk(SINGLE_CONTRACTOR, (id) => {
  return contractorService.fetch(id)
})

export const getActiveContractors = createAsyncThunk(ACTIVE_CONTRACTORS, () => {
  return contractorService.fetchAllActive()
})

export const getAllAssignedContractors = createAsyncThunk(ASSIGNED_CONTRACTORS, (request) => {
  return contractorService.fetchAllAssigned(request)
})

export const assignContractor = createAsyncThunk(ASSIGN_CONTRACTOR, (data) => {
  return requestContractorService.create(data)
})

export const assignArea = createAsyncThunk(ASSIGN_AREA, (data) => {
  return contractorService.assignArea(data)
})

export const assignHighlight = createAsyncThunk(ASSIGN_HIGHLIGHT, (data) => {
  return contractorService.assignHighlight(data)
})

export const assignLanguage = createAsyncThunk(ASSIGN_LANGUAGE, (data) => {
  return contractorService.assignLanguage(data)
})

export const contractorDetails = createAsyncThunk(DETAILS_CONTRACTOR, (id) => {
  return contractorService.details(id)
})

export const deleteContractor = createAsyncThunk(DELETE_CONTRACTOR, (id) => {
  return contractorService.delete(id).then(response => {
    if (response.success){
      return id
    } else {
      return 0
    }
  })
})

export const updateContractorStatus = createAsyncThunk(STATUS_CONTRACTOR, (data) => {
  return contractorService.changeStatus(data).then(response => {
    if (response.success){
      return data.id
    } else {
      return 0
    }
  })
})

export const updateContractorFeature = createAsyncThunk(FEATURE_CONTRACTOR, (data) => {
  return contractorService.changeFeatured(data).then(response => {
    if (response.success){
      return data.id
    } else {
      return 0
    }
  })
})

const contractor = createSlice({
  name: CONTRACTOR_REDUCER,
  initialState,
  reducers: {
    successListener: (state) => {
      state.success = false
    },
    detailsSuccessListener: (state) => {
      state.detailSuccess = false
    },
    affiliationSuccessListener: (state) => {
      state.affiliationSuccess = false
    },
    awardSuccessListener: (state) => {
      state.awardSuccess = false
    },
    badgeSuccessListener: (state) => {
      state.badgeSuccess = false
    },
    projectSuccessListener: (state) => {
      state.projectSuccess = false
    },
  },
  extraReducers: builder => {
    //ALL CONTRACTORS ///////////////////////////
    builder.addCase(getContractors.pending, state => {
      state.loading = true
    })
    builder.addCase(getContractors.fulfilled, (state, action) => {
      state.loading = false
      state.contractors = action.payload.contractors
      state.error = ''
      state.fetched = true
    })
    builder.addCase(getContractors.rejected, (state, action) => {
      state.loading = false
      state.contractors = []
      state.error = action.error.message
    })

    //RECENT CONTRACTORS ///////////////////////////
    builder.addCase(getRecentContractors.pending, state => {

    })
    builder.addCase(getRecentContractors.fulfilled, (state, action) => {
      state.recentContractors = action.payload.contractors
    })
    builder.addCase(getRecentContractors.rejected, (state, action) => {
      state.recentContractors = []
    })

    //POPULAR CONTRACTORS ///////////////////////////
    builder.addCase(getPopularContractors.pending, state => {

    })
    builder.addCase(getPopularContractors.fulfilled, (state, action) => {
      state.popularContractors = action.payload.contractors
    })
    builder.addCase(getPopularContractors.rejected, (state, action) => {
      state.popularContractors = []
    })

    //ASSIGNED CONTRACTORS ///////////////////////////
    builder.addCase(getAllAssignedContractors.pending, state => {
      state.assignedLoading = true
    })
    builder.addCase(getAllAssignedContractors.fulfilled, (state, action) => {
      state.assignedLoading = false
      state.assignedContractors = action.payload.contractors
      state.assignedError = ''
      state.assignedFetched = true
    })
    builder.addCase(getAllAssignedContractors.rejected, (state, action) => {
      state.assignedLoading = false
      state.assignedContractors = []
      state.assignedError = action.error.message
    })

    //ASSIGN CONTRACTOR
    builder.addCase(assignContractor.fulfilled,  (state, action) => {
      const value = state.assignedContractors.find(v => v.contractor === action.payload.requestContractor.contractor)
      if (value) {
        emailService.assignContractor({ email: value.email, name: value.name })
        value.assigned = action.payload.requestContractor.contractor
      }
    })

    //ASSIGN AREA
    builder.addCase(assignArea.fulfilled,  (state, action) => {
      const value = state.contractorDetails?.areas?.find(v => v.id === action.payload.area.city)
      if (value) {
        value.assigned = action.payload.area.id
      }
    })

    //ASSIGN HIGHLIGHTS
    builder.addCase(assignHighlight.fulfilled,  (state, action) => {
      const value = state.contractorDetails?.highlights?.find(v => v.id === action.payload.highlight.highlight)
      if (value) {
        value.assigned = action.payload.highlight.id
      }
    })

    //ASSIGN LANGUAGE
    builder.addCase(assignLanguage.fulfilled,  (state, action) => {
      const value = state.contractorDetails?.languages?.find(v => v.id === action.payload.language.language)
      if (value) {
        value.assigned = action.payload.language.id
      }
    })

    //GET CONTRACTOR /////////////////////////////////////
    builder.addCase(getContractor.pending, state => {
      state.contractorLoading = true
    })
    builder.addCase(getContractor.fulfilled, (state, action) => {
      state.contractorLoading = false
      state.contractor = action.payload.contractor
      state.contractorError = ""
    })
    builder.addCase(getContractor.rejected, (state, action) => {
      state.contractorLoading = false
      state.contractor = null
      state.contractorError = action.error.message
    })

    //ACTIVE CONTRACTORS ////////////////////////
    builder.addCase(getActiveContractors.pending, state => {

    })
    builder.addCase(getActiveContractors.fulfilled, (state, action) => {
      state.activeContractors = action.payload.contractors
      state.activeFetched = true
    })
    builder.addCase(getActiveContractors.rejected, (state, action) => {

    })

    //CONTRACTOR DETAILS ///////////////////////////
    builder.addCase(contractorDetails.pending, state => {
      state.detailsLoading = true
    })
    builder.addCase(contractorDetails.fulfilled, (state, action) => {
      state.detailsLoading = false
      state.contractorDetails = action.payload.data
      state.detailsError = ''
    })
    builder.addCase(contractorDetails.rejected, (state, action) => {
      state.detailsLoading = false
      state.contractorDetails = null
      state.detailsError = action.error.message
    })

    //ADD CONTRACTOR /////////////////////////////////////////
    builder.addCase(addContractor.pending, state => {
      state.success = false
    })
    builder.addCase(addContractor.fulfilled, (state, action) => {
      state.success = true
      let tempContractors = [...state.contractors]
      let contractor = action.payload.contractor
      state.successID = action.payload.contractor?.id
      tempContractors.unshift(contractor)
      state.contractors = tempContractors
    })
    builder.addCase(addContractor.rejected, (state, action) => {
      state.success = false
    })

    //EDIT CONTRACTOR //////////////////////////////////////////
    builder.addCase(updateContractor.pending, state => {
      state.success = false
    })
    builder.addCase(updateContractor.fulfilled, (state, action) => {
      state.success = true
      if (action.payload) {
        const value = state.contractors.find(v => v.id === action.payload.id)
        Object.assign(value, action.payload)
      }
    })
    builder.addCase(updateContractor.rejected, (state, action) => {
      state.success = false
    })

    //ADD CONTRACTOR DETAILS /////////////////////////////////////////
    builder.addCase(addContractorDetails.pending, state => {
      state.detailSuccess = false
    })
    builder.addCase(addContractorDetails.fulfilled, (state, action) => {
      state.detailSuccess = true
    })
    builder.addCase(addContractorDetails.rejected, (state, action) => {
      state.detailSuccess = false
    })

    //ADD CONTRACTOR AFFILIATION /////////////////////////////////////////
    builder.addCase(addAffiliation.pending, state => {
      state.affiliationSuccess = false
    })
    builder.addCase(addAffiliation.fulfilled, (state, action) => {
      state.affiliationSuccess = true
    })
    builder.addCase(addAffiliation.rejected, (state, action) => {
      state.affiliationSuccess = false
    })

    // builder.addCase(deleteContractor.fulfilled, (state, action) => {
    //     state.deleting = false
    //     state.contractors = state.contractors.filter((value) => value.id !== action.payload)
    // })

    //ADD CONTRACTOR AWARD /////////////////////////////////////////
    builder.addCase(addAward.pending, state => {
      state.awardSuccess = false
    })
    builder.addCase(addAward.fulfilled, (state, action) => {
      state.awardSuccess = true
    })
    builder.addCase(addAward.rejected, (state, action) => {
      state.awardSuccess = false
    })

    //ADD CONTRACTOR BADGE /////////////////////////////////////////
    builder.addCase(addBadge.pending, state => {
      state.badgeSuccess = false
    })
    builder.addCase(addBadge.fulfilled, (state, action) => {
      state.badgeSuccess = true
    })
    builder.addCase(addBadge.rejected, (state, action) => {
      state.badgeSuccess = false
    })

    //ADD CONTRACTOR PROJECT /////////////////////////////////////////
    builder.addCase(addProject.pending, state => {
      state.projectSuccess = false
    })
    builder.addCase(addProject.fulfilled, (state, action) => {
      state.projectSuccess = true
    })
    builder.addCase(addProject.rejected, (state, action) => {
      state.projectSuccess = false
    })

    //UPDATE CONTRACTOR DETAILS /////////////////////////////////////////
    builder.addCase(editContractorDetails.pending, state => {
      state.detailSuccess = false
    })
    builder.addCase(editContractorDetails.fulfilled, (state, action) => {
      state.detailSuccess = true
    })
    builder.addCase(editContractorDetails.rejected, (state, action) => {
      state.detailSuccess = false
    })

    //DELETE CONTRACTOR ////////////////////////////////////////
    builder.addCase(deleteContractor.pending, state => {
      state.deleting = true
    })
    builder.addCase(deleteContractor.fulfilled, (state, action) => {
      state.deleting = false
      state.contractors = state.contractors.filter((value) => value.id !== action.payload)
    })
    builder.addCase(deleteContractor.rejected, (state, action) => {
      state.deleting = false
    })

    //STATUS CONTRACTOR ////////////////////////////////////////
    builder.addCase(updateContractorStatus.pending, state => {

    })
    builder.addCase(updateContractorStatus.fulfilled, (state, action) => {
      const value = state.contractors.find(v => v.id === action.payload)
      if (value) {
        if (value.status === 0) {
          value.status = 1
        } else {
          value.status = 0
        }
      }
    })
    builder.addCase(updateContractorStatus.rejected, (state, action) => {

    })

    //FEATURE CONTRACTOR ////////////////////////////////////////
    builder.addCase(updateContractorFeature.pending, state => {

    })
    builder.addCase(updateContractorFeature.fulfilled, (state, action) => {
      const value = state.contractors.find(v => v.id === action.payload)
      if (value) {
        if (value.featured === 0) {
          value.featured = 1
        } else {
          value.featured = 0
        }
      }
    })
    builder.addCase(updateContractorFeature.rejected, (state, action) => {

    })
  }
})

export default contractor.reducer
export const { successListener, detailsSuccessListener, affiliationSuccessListener, awardSuccessListener, badgeSuccessListener, projectSuccessListener } = contractor.actions
