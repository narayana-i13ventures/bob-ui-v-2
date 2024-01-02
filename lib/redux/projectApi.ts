import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProjectApiSlice = createApi({
    reducerPath: "ProjectApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://bobapi.azurewebsites.net",
        headers: {
            "content-type": "application/json"
        }
    }),
    keepUnusedDataFor: 100000,
    tagTypes: ["companies", "company"],
    endpoints: (builder) => ({
        getAllProjects: builder.query({
            query: (sharedProjects: any) => ({
                url: `v1/project/allprojects?user_id=2&shared_projects=1`,
            }),
            providesTags: ['companies']
        }),
        getProjectById: builder.query({
            query: (projectId: any) => ({
                url: `/v1/project/getproject?user_id=2&project_id=${projectId}`,
            }),
            providesTags: ['company']
        }),
        createProject: builder.mutation({
            query: ({ projectData }) => ({
                url: '/v1/project/newproject',
                method: 'POST',
                body: JSON.stringify({
                    "project_data": {
                        "companyName": projectData?.companyName,
                        "industry": projectData?.industry,
                        "vertical": projectData?.vertical,
                        "companyType": projectData?.companyType,
                        "companySize": projectData?.companySize,
                        "companyHeadquarters": projectData?.companyHeadquarters,
                        "companyTargetRegions": projectData?.companyTargetRegions,
                        "fundingStage": projectData?.fundingStage,
                        "annualRevenue": projectData?.annualRevenue,
                        "businessModel": projectData?.businessModel,
                    },
                    "user_id": 1
                })
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try {
                    // Correctly invoke queryFulfilled to get the data
                    const responseData: any = await queryFulfilled;

                    console.log(responseData[0]);
                    // Dispatch the updateQueryData action
                    const patchResult = dispatch(
                        ProjectApiSlice.util.updateQueryData('getAllProjects', {}, (draft: any) => {
                            draft?.own_projects?.push(responseData[0]);
                        })
                    );
                    console.log(patchResult);

                } catch (error) {
                    // Handle errors if needed
                }
            },
        }),

        deleteProjectById: builder.mutation({
            query: (projectId: any) => ({
                url: '/v1/project/delete',
                method: 'POST',
                body: JSON.stringify({
                    "user_id": 1,
                    "project_id": projectId
                })
            }),
            async onQueryStarted(projectId, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(ProjectApiSlice.util.updateQueryData("getAllProjects", true, (draft: any) => {
                        const companyIndex = draft?.owned_projects?.findIndex(
                            (company: any) => company?.project_id === projectId
                        );
                        if (companyIndex !== -1) {
                            draft?.owned_projects?.splice(companyIndex, 1);
                        }
                        return draft;
                    }));
                } catch (error) {
                    // Handle error if needed
                }
            },
        })
    })
});
export const {
    useGetAllProjectsQuery,
    useGetProjectByIdQuery,
    useCreateProjectMutation,
    useDeleteProjectByIdMutation
} = ProjectApiSlice;
