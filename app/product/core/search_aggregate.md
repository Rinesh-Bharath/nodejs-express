[{
	$lookup: {
		from: 'user_development',
		localField: 'audit.created_by',
		foreignField: 'user_id',
		as: 'created_by_user'
	}
}, {
	$unwind: {
		path: "$created_by_user",
		preserveNullAndEmptyArrays: true
	}
}, {
	$lookup: {
		from: 'user_development',
		localField: 'audit.updated_by',
		foreignField: 'user_id',
		as: 'updated_by_user'
	}
}, {
	$unwind: {
		path: "$updated_by_user",
		preserveNullAndEmptyArrays: true
	}
}, {
	$project: {
		product_id: 1,
		name: 1,
		status: 1,
		price: 1,
		color: 1,
		audit: 1,
		created_by_user: {
			user_id: 1,
			display_name: 1,
			email: 1
		},
		updated_by_user: {
			user_id: 1,
			display_name: 1,
			email: 1
		}
	}
}, {
	$sort: {
		price: 1
	}
}, {
	$skip: 1
}, {
	$limit: 10
}]